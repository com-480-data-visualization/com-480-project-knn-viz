# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Haeeun Kim|304107 |
| Natalie Bolón Brun|285155 |
| Natalia Gullón Altés|295107 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### Dataset

The dataset we are going to use is *120 years of Olympic history: athletes and results*. The dataset is extracted from  [Kaggle](https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results) and contains data about the athletes that have taken part in the olympics (summer and winter) from 1896 to 2016. 

The data contains over 270k entries where each entry corresponds to an athlete taking part in any sportive event. Details we can extract from the data are **Name, Year, NOC (National Olympic Committee), Sport, Event, Medal** among others. 

This dataset is already clean and ready to use, so we only need to do the data exploration and get the results that we want to visualize.

Additionally, we have created another small [dataset](data/host_cities.csv) with information about the host cities that have held the olympics such as their country, continent and hemisphere in order to explore them in more detail.

### Problematic

Our motivation is to show people more things about the olympics in an easy way and anyone that is interested in the topic can discover new things about these historical events. Therefore, our target audience would be the general public and, in particular, people interested in sports and the olympics.
We will start by taking a historical look, showing information about the host cities and interruptions they have suffered due to major events. From there we want to proceed to evaluate a question: what makes a country successful? Why are there countries with a lot of medals and others with any? 

To analyse this question, we will go through different aspects. We can start by the influence of the number of participations: 
* participation of countries along time
* number of participants along time and also grouped by country
Then we will check the influence of sports in this "successfulness" factor:
* which sports have more events?
* how have sports varied along time? 
* which countries are more successful in each sport?
With this factors we can get an idea per country of how they perform on each of these factors (# athletes, # years participating, # sports in which they take part, etc.) and maybe even propose a new ranking that could be something like how many medals they have / how many medals they could have had taking into account all the competitions they have taken part in.

The data will be displayed in a way that allows the reader to extract information and interact in different levels. We want our visitors to learn more about the olympics, from general facts that may not be that well known, to more detailed information that requires further analysis. The idea is that no matter how you landed in our page, you will obtain what you were looking for:
*	If you are just visiting and want to learn some general facts to later share with your friends, some text will accompany the different visualizations so that even without further engagement you can extract these facts.
*	If you are more interested in the topic and want to explore further, interactive visualizations will allow you to do so and get more insights by yourself.


### Pre-processing of the data set you chose:

The initial dataset is already clean and ready to be used. 

We divided our first exploratory analysis in 4 parts taking different points of views. Here are the main basic insights of each one of them:

* **From a historical point of view**:

  * Different big historical events such as World War I and II have affected the games multiple times.
  
  * The number of athletes participating each year follow an increasing trend, with a majority of men through all the years. However, the gap between males and females participating in the Games have been descreasing over time. 
  
  * Swimming, fencing, cycling, athletics and gymnastics are the only sports that have been present in all the summer games.

  * The number of National Olympic Comittees (NOCs) participating in the summer games have also been increasing over years. 
  
  * Most of the host cities of the summer olympics are located in Europe, although the country that has held more times the summer games is the USA.
  
* **From sport point of view**:

  * The number of different event belonging to the same sport varies a lot depending on the sport. The two sports with more different events throughout the history are athletics and shooting with 83 events. These are followed by swimming, cycling and sailing. 
  
  * Most of the events have been individual (~70% individual vs 30% of team events).
  
  * Most of the events have been for males, followed by events for females and mixed. This last one represent a low percentage. 
  
* **From country point of view**:

  * The USA is the country with more medals in total. It is also the country with more gold medals in the summer olympics, but not in the winter ones. The country with more gold medals in the winter olympics is Germany. 
  
* **From athlete point of view**:

  * Michael Phelps is the athlete with olympic medals (total of 28) as well as the one with more gold medals with a total of 23.
  
  * The athlete who participated more years in the games is Ian Millar with a participation in 10 different games (from 1972 to 2012).
  
  * There are athletes that have participated in more than 1 sport. The ones who have taken part in more sports have participated in 5 different ones. However, most of them did not achieve any medal.
  
  * There are athletes who have participated in both summer and winter olympics.
  
The whole exploratory data analysis is available [here](data_exploration.ipynb).


### Related work

We want to visualize insights from the Olympics Games. However, visualizations using the olympics as data are not new. Some good examples are:

* [The Winter Games, by Elbert Wang](https://www.dremio.com/the-winter-olympics/)
In this visualization they show the evolution of the winter olympics across different topics (number of participants, number of sports, host cities, etc.). We can take it as inspiration for some graphics (how it display medals per country looks nice) but we would like to create something more interactive where the user has more control over the data it wants to see. 

* [App Olympics Data, by Matthew Rautionmaa](https://matthewrautionmaa.shinyapps.io/Olympic_Shiny/) 
This app provides different plots using the same dataset as we plan to use. In this case, the number of plots is large and many topics are already explored. Nevertheless, no further information is shared with the user and the degree of interactivity is very limited. 

Some inspiration from other projects that are specially interesting because they outstand in one of the points we are trying to achieve with our visualization are: 

* [Pudding](https://pudding.cool/) usually presents similar transitions on their data stories to the one showed in [The Winter Games, by Elbert Wang](The-Winter-Games,-by-Elbert-Wang). One example is ['Where will you need an umbrella?'](https://pudding.cool/2020/02/rain/) where they combine some data plots together with text and as the user advances the same plot introduces new data as the text displays new information. 

* A more interactive and engaging project is ["Based on a True Story, from Information is Beautiful](https://informationisbeautiful.net/visualizations/based-on-a-true-true-story/). This project shows different movies and signals which parts are actually based on real stories and which parts are not. The interesting point is the level of freedom the user has at the time of selecting a movie and a part of it to read new information. 

* [Missing Flights, by The New York Times](https://www.nytimes.com/interactive/2020/02/21/business/coronavirus-airline-travel.html). The project provides an very nice animation at the begginning comparing two scenarios. The animation allows the user to easily spot the differences (in terms of density of flights). A few information is shared at the begginning (some highlights) and then, for those users who are more interested, a more developed explanation is followed. This format looks very interesting because it allows the user to choose to which level of depth it wants to explore the information. Either it can choose to just look at the initial animation and get the important points or it can continue reading further for more details. 



## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

