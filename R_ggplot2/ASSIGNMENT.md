# INF 554 Assignment 4

## Description 
Use data in [RTL15 Google Drive folder](https://drive.google.com/drive/folders/0B5Xlglg4ZYkBcjBsR0hpOVpmV28?usp=sharing) (login with USC Google account), consisting of zipped transponder flight data. See below for details of the data.

The scope of the analysis is to see if there are any quantifiable differences between before/after Columbus day (Monday, October 12th, 2015) - an oft cited milestone for recent changes in noise. These changes are thought to be related to the implementation of the NextGen program by the FAA.

For this we ask you compare flight patterns for two days, one in March or April and the other in November or December. For the comparison we ask you compare daytime (i.e., Westerly Operations, 6:30AM-12AM) and nighttime (i.e., Over-Ocean Operations, 12AM-6:30AM) patterns.

Select 2 days/nights to analyze: a day/night in March or April and a corresponding day/night (**same** day/night of the week) in November or December. For example, student A can select Sunday, March 22nd and Sunday, November 15th, 2015. **Sign up** in Google Sheet [here](https://docs.google.com/a/usc.edu/spreadsheets/d/1IveqSVm3Zezx9Ox9NPPK8z-jpc28kZv9ZGGTCoXf1rU/edit?usp=sharing) ensuring you are the only one to use the days you picked.

Create an RStudio project `a4-analysis.Rproj`. Create an R notebook named `a4-notebook.Rmd` to document and present the analysis. Use R files and ggplot2 for the analysis. Provide multiple comparisons to understand patterns spatially and temporally for the days you selected breaking down the analysis by daytime and nighttime. Publish `a4-notebook.Rmd` on [RPubs](https://rpubs.com) and **provide a link to the published notebook in the README.md.**

Think about what question you answer: what insights are you providing to the viewer?. Examples of patterns to visualize include:

- Overall trends
- Number of flights and number of different airlines over time
- Differences in altitude at a specific point (e.g., SMO) over time
- Differences in path (latitude, longitude and altitude) over time
- Differences in descent rate (altitude vs time)

## Dataset

You can access the dataset on Google Drive [here](https://drive.google.com/drive/folders/0B5Xlglg4ZYkBcjBsR0hpOVpmV28?usp=sharing). The dataset contains transponder data for March-April and November-December 2015. Each ADS-B transponder file
is named as:
```
RTL15MMDD00.log.gz
```
, where `MM` and `DD` denote the month and the day. Each file contains one line per record:
```
"2015/03/01","15:59:58.000","1111111","A9FA34","CKS825","Unknown","0","10025","10025","34.05808","-118.72192","0","0","285.5","114.4","0","0000"
```

corresponding to:

```
<date>,<time>,"1111111",<flightNumber>,<ICAO>,"Unknown","0",<altitude>,<altitude>,<latitude>,<longitude>,...
```

, where the strings between double quotes are the same in all records. Each file contains records for 2 consecutive calendar days starting at 16:00:00.000 the first day and ending at 15:59:59.000 the following day.

### References

- Lecture slides.
- `2-R-wrangling.R` contains code to preprocess and `3-ggplot2.Rmd` to visualize the data.
- LAX noise roundtable has issued the [North Arrival Study](http://www.lawa.org/uploadedFiles/lax/noise/presentation/noiseRT_160608_North%20Arrival%20Study%20Results.pdf) on a different dataset. The report contains background information that you may find useful.
For example, consider flights within 2 km from the Santa Monica VOR – a navigational aid on the southwest edge of Santa Monica Airport (SMO).

## Rubric

| 	            | Data Wrangling	| Data Analysis	| Development & Publishing |
| ------------- | --------------- | ------------- | ------------------------ |
| Sophisticated	| Corresponding days data is carefully extracted and well documented in R file (4-5 pts) | The analysis is comprehensive and well documented, the choice of the visualizations is adequate and figures are well formed (4-5 pts) | Appropriate use of RStudio and GIT is demonstrated, R Notebook is published in Rpub (4-5 pts) |
| Competent	   | Corresponding days data may not be carefully extracted, may not be well documented in R file (2-3 pts) | The analysis may not be comprehensive or may not be well documented, the choice of the visualizations may not be adequate and figures may not be well formed (2-3 pts) | Appropriate use of RStudio and GIT may not be demonstrated, R Notebook is published in Rpub (2-3 pts) |
| Needs work	  | Corresponding days data is not carefully extracted and is not well documented in R file (0-1 pts) | The analysis is not comprehensive and is not be well documented, the choice of the visualizations is not adequate and figures are not well formed (0-1 pts) | Appropriate use of RStudio and GIT is not be demonstrated, R Notebook is not published in Rpub (0-1 pts) |

## Homework Guidelines
- Homework repository must be updated before the start of next class
- Late policy applies (10% of total available points per each 24-hour period late; duration less than 24 hours counts as a full period)
- Homework is expected to work in: SAFARI AND CHROME (Mac), IE AND CHROME (Windows)
