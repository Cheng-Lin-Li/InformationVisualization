######################################
# Process gzip files for day/night
######################################

#create RTL15 data directory
#dir.create('RTL15')


######################################
# These packages have to install.
# install.packages('dplyr')
# install.packages('lubridate')
# install.packages('ggplot2')
# install.packages('ggmap')
# install.packages('plotly')
# install.packages('sp')
# install.packages('geosphere')
######################################

#will use dplyr and lubridate
library(dplyr)
library(lubridate)
library(ggplot2)
library(ggmap)
library(plotly)
library(dplyr)
library(sp)
library(geosphere)

######################################
# Loading data.
######################################

SMO <- data.frame(label = 'SMO', lon=-118.456667, lat=34.010167)
smo <- c(SMO$lon, SMO$lat)

# load RTL gzip file
# df <- load_rtl('./RTL15/RTL15031400.log.gz')

load_rtl <- function(filename) { 
  df <- read.csv(gzfile(filename), header=F)
  
  #V1 date: from 2015/03/01 to 2015/03/02
  #V2 is a time formatted as HH:MM:SS.000; from 16:00:00.000 to 15:59:58.000
  #V3 is 1111111
  #V4 is the transponder code (normally unique ICAO 24-bit address or (informally) Mode-S 'hex code')
  #V5 is the flight number
  #V6 is 'Unknown'
  #V7 is '0'
  #V8 == V9 altitude
  #V10 latitude
  #V11 longitude
  #V12-17 do not seem to be useful
  
  ######################################
  # Tidying-up the data.
  ######################################
  
  df <- df[,1:11]  #only keep first 11
  
  #set timestamp from V1(date) and V2(time)
  df <- df %>% mutate(timestamp = ymd_hms(paste(df$V1, df$V2), tz='America/Los_Angeles'))
  
  #remove not useful
  df$V1 <- NULL
  df$V2 <- NULL
  df$V3 <- NULL
  df$V6 <- NULL
  df$V7 <- NULL
  df$V9 <- NULL
  
  #rename columns
  names(df) <- c('code', 'flight', 'alt', 'lat', 'lon', 'timestamp')
  
  #drop records with invalid lat, lon and alt readings
  df <- df[df$lat != 0,]
  df <- df[df$alt > 0,]
  
  #fix flight names: strip white spaces from flight
  df$flight <- gsub('^[[:space:]]+|[[:space:]]+$', '', df$flight)
  df$flight[df$flight == '?'] <- ''
  df$flight[df$flight == '00000000'] <- ''
  df$flight[df$flight == '????????'] <- ''
  df$flight[df$flight == '@@@@@@@@'] <- ''
  
  #fix empty flights names with unique's flight associated using the code
  uniques <- unique(df[c('flight', 'code')])
  uniques <- uniques[uniques$flight != '',]
  na.flight <- which(df$flight == '')
  na.code <- df$code[na.flight]
  df$flight[df$flight == ''] <- uniques$flight[match(na.code, uniques$code, NA)]
  
  #order the dataframe
  df <- df[order(df$code, df$flight, df$timestamp, decreasing = FALSE),]
  
  #remove code starting with a60 and no flight name as these are from private planes.
  df <- df %>% filter(!(grepl('[acd]60', code) & is.na(flight)))
  df <- df %>% filter(!(grepl('[c]50', code) & is.na(flight)))
  df <- df %>% filter(!(grepl('[d]20', code) & is.na(flight)))
  
  #remove duplicate rows
  df <- unique(df)  #or with dplyr: df <- df %>% distinct()
  
  #using dplyr keep only first time for same flight position (alt, lon, lat)
  df <- df %>%
    group_by(code, flight, lat, lon, alt) %>% 
    summarize(timestamp = first(timestamp))
  
  #using dplyr keep only first alt for same flight location (lon, lat) and time
  df <- df %>%
    group_by(code, flight, lat, lon, timestamp) %>% 
    summarize(alt = first(alt))  #could use mean(alt)
  
  #using dplyr keep first alt, lat, lon for the same flight at the same time
  df <- df %>%
    group_by(timestamp, flight, code) %>%
    summarise(alt = first(alt), lat = first(lat), lon = first(lon))
  
  #add track variable to identify separate flights in the same day (delta(timestamp) > )
  df <- df[order(df$code, df$flight, df$timestamp, decreasing = FALSE),]  #ensure is ordered by flight & timestamp
  df <- df %>% group_by(code, flight) %>%
    mutate(track = as.integer(difftime(timestamp, lag(timestamp)))) %>%
    mutate(track = ifelse(is.na(track), 0, track)) %>%
    mutate(track = ifelse(track > 3600, 1, 0)) %>%  #3600s = 1h
    mutate(track = cumsum(track)) %>%
    mutate(id = paste0(code, flight, track))
  
  #count number of records per track
  df2 <- df %>% count(code, flight, track, id) %>% filter(n < 6)
  #df3 <- df %>% group_by(code, flight, track) %>% summarize(n = n())  #similar way of counting!
  
  #remove too few records per track
  df <- df %>% filter(!(id %in% df2$id))
  
  df <- df %>% arrange(flight, code, track, desc(timestamp))  #arrange rows with dplyr
  df <- df %>% select(timestamp, flight, code, track, id, lon, lat, alt)  #re-order column names

  # keep only if alt between [3000; 11000] feet
  df <- df %>% filter(alt < 11000 & alt > 3000)  #observations that go within 2km of SMO.
  
  #compute closest distance to SMOVOR (in meters)
  df$dist <- distHaversine(smo, cbind(df$lon, df$lat))  #geodesic distance (great-circle distance) to SMO
  
  # filter flights that get within 2Km from SMOVOR
  df_min <- df %>% filter(dist < 2000.0)  #closest observations to SMO
  df <- df %>% filter(id %in% df_min$id)  #observations that go within 2km of SMO.
  
  # remove flights are NA
  #df <- df %>% filter(!is.na(flight))
  df <- df[complete.cases(df), ] # Should be equblient method.
  
  return (df)
}

# day 1: 150314
###############
df11 <- load_rtl('RTL15/RTL15031400.log.gz');
df12 <- load_rtl('RTL15/RTL15031500.log.gz');
df1 <- dplyr::bind_rows(df11, df12)

#filter night: (12AM-6:30AM) day: (6:30AM-12AM)
nighttime <- interval(ymd_hms('2015-03-14 00:00:00', tz='America/Los_Angeles'), ymd_hms('2015-03-14 06:30:00', tz='America/Los_Angeles'))
daytime <- interval(ymd_hms('2015-03-14 06:30:00', tz='America/Los_Angeles'), ymd_hms('2015-03-15 00:00:00', tz='America/Los_Angeles'))

df1d <- df1 %>% filter(timestamp %within% daytime)
df1n <- df1 %>% filter(timestamp %within% nighttime)
#verify time intervals with summary(df1d) and summary(df1n)

# save to csv for analysis
write.table(df1d, 'RTL150314_day.csv', sep = ',', row.names=FALSE)
write.table(df1n, 'RTL150314_night.csv', sep = ',', row.names=FALSE)

# day 2: 151211
###############
df21 <- load_rtl('RTL15/RTL15121200.log.gz');
df22 <- load_rtl('RTL15/RTL15121300.log.gz');
df2 <- dplyr::bind_rows(df21, df22)

#filter
#night: (12AM-6:30AM)
#day: (6:30AM-12AM)
nighttime <- interval(ymd_hms('2015-12-12 00:00:00', tz='America/Los_Angeles'), ymd_hms('2015-12-12 06:30:00', tz='America/Los_Angeles'))
daytime <- interval(ymd_hms('2015-12-12 06:30:00', tz='America/Los_Angeles'), ymd_hms('2015-12-13 00:00:00', tz='America/Los_Angeles'))

df2d <- df2 %>% filter(timestamp %within% daytime)
df2n <- df2 %>% filter(timestamp %within% nighttime)
#verify time intervals with summary(df1d) and summary(df1n)

# save to csv for analysis
write.table(df2d, 'RTL151212_day.csv', sep = ',', row.names=FALSE)
write.table(df2n, 'RTL151212_night.csv', sep = ',', row.names=FALSE)

