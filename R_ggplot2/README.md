# R and ggplot2 
### Transponder flight data analysis of Santa Monica VOR(SMOVOR)
Please read the report on R notebook 'a4-notebook.Rmd', which is published on [RPubs website](http://rpubs.com/Cheng-Lin_Li/309552)

## R Notebook URL:
The R Notebook published on [RPubs website](http://rpubs.com/Cheng-Lin_Li/309552)

## Objective: 
#### This notebook focuses on transponder flight data analysis of Santa Monica VOR(SMOVOR) which locates on the southwest edge of Santa Monica Airport (SMO).

## Dataset Scope: 
  The scope of the analysis is to see if there are any quantifiable differences between before/after Columbus day (Monday, October 12th, 2015) - an oft cited milestone for recent changes in noise.

  Two dates are selected in this analysis for comparisons: March 14, 2015 and December 12, 2015.

## Data Wrangling:
### 1. There are total four data files in this analysis. 
```
  a. day1_night: 00:00AM ~ 06:30AM on March 14, 2015
  b. day1_day: 06:30AM on March 14, 2015 ~ 00:00AM on March 15, 2015
  c. day2_night: 00:00AM ~ 06:30AM on December 12, 2015
  d. day2_day: 06:30AM on December 12, 2015 ~ 00:00AM on December 13, 2015
```
### 2. Data cleaning process:
```
  a. Load the data
  b. Select the data columns we want
  c. Transform date and time values to timestamp
  d. Remove unuse data of columns by null
  e. Set up the name to columns
  f. Get valid altitude (alt), and latitude (lat)
  g. Strip white spaces from flight name and fill in empty flight name by unique flight name associated using the flight code
  h. Remove private plan from dataset by flight code = a60, d60, c60, c50, d20 with null flight name.
  i. Remove duplicate row data.
  j. Get the first data for same position (alt, lon, lat), timestamp, and flight
  k. Add track variable on same flight on same date if the flight stay more than 1 hour, remove less than 6 records
  l. Re-order column names
  m. keep only altitude between 3000 and 11000 feet
  n. Filter flights that get within 2Km from SMOVOR
  o. Remove any row with NA
  p. Filter correct time period and save to csv format for each data file.
```
### 3. Final dataset:

  a. [day1_night: 00:00AM ~ 06:30AM on March 14, 2015](RTL150314_day.csv)

  b. [day1_day: 06:30AM on March 14, 2015 ~ 00:00AM on March 15, 2015](RTL150314_night.csv)

  c. [day2_night: 00:00AM ~ 06:30AM on December 12, 2015](RTL151212_day.csv)

  d. [day2_day: 06:30AM on December 12, 2015 ~ 00:00AM on December 13, 2015](RTL151212_night.csv)

### 4. Analysis:
There are 2 approachs to read the results.

1. Please read it online on [RPubs website](http://rpubs.com/Cheng-Lin_Li/309552) (* Highly recommand) ,or 
2. Download the [html file](a4-notebook.nb.html), or 

#### 5. Key files:
1. Data Wrangling code: [a4-data-wrangling.R ](a4-data-wrangling.R )
2. Analysis report in R notebook: [a4-notebook.Rmd](a4-notebook.Rmd). 
* Notice: The R notebook link will bring you to the source code of R notbook on github. The R notebook has to work with data - 4 csv files on [final dataset](#3. Final dataset:) section and install reletive packages which describs in R notebook to display the infographic.)

## Reference & Tools:
  1. Data Source: Airplane transponder data provided in INF554 class at University of Southern California.
  2. Data Wrangling: Source code provided by instructor, Dr. Luciano Nocera, in INF554 class at University of Southern California. 
  3. Tools: R Core Team (2017). R: A language and environment for statistical computing. R Foundation for Statistical Computing, Vienna, Austria. URL https://www.R-project.org/.
