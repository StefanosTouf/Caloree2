# Caloree2

Caloree2 is a fitness tracker web app with the base functionality of other popular fitness trackers. The design and functionality is heavily based on the app Cronometer.

**You can see a live version of the app deployed on heroku at: https://caloree.herokuapp.com/**

## Where does Caloree2 get its food related data?
Caloree2 uses the **USDA Food Data Central api**  to search foods and their nutritional values. https://fdc.nal.usda.gov/api-guide.html

##### Note:
The usda food data central api is sometimes down and cant respond to any requests. If the app isnt working correctly, the service might be currently unavailable


## Main Features

### Food Consumption diary
You can log your daily food consumption and categorize it using **meals**. You can view and edit a previous date's logged foods any time in the future or plan ahead using the calendar on the left.

###### screenshots:
![image](https://user-images.githubusercontent.com/61254766/121781003-85d35d80-cbab-11eb-955d-162a98a4c170.png)


### General and detailed daily info
The sum of all nutrients of the foods you have consumed along with your cooresponding daily target are displayed on the General Info and Detailed Info sections. 

On the General Info you will find the breakdown of most comonly tracked nutrients (Energy, Protein, Fat, Carbs, Fiber). 

On the Detailed Info you will find a more detailed look into the macronutrient/micronutrient content of your logged foods. 

If at any point you need to view the specific nutritional info of a single logged food, you can simply select it. Then, the General and Detailed Info sections will be displaying the information of that specific food

###### screenshots:
![image](https://user-images.githubusercontent.com/61254766/121781071-cd59e980-cbab-11eb-834c-b4623e1b997c.png)


### Creating a meal and logging a food
To get started with tracking your day, you can simply add a meal to todays log and then add a food to that meal. When adding a food you can view and search all available foods, then view the foods nutritional info and select the weight of the food you want to add. 

You can also rename a meal and delete foods from that meal at any point.

###### screenshots:
![image](https://user-images.githubusercontent.com/61254766/121781465-8b31a780-cbad-11eb-97c1-c695c9c404ad.png)


### The Foods page
The foods page is similar to the foods addition Component, you can search, view and select the weight of any of the available foods. This is used as an easy way for the user to find out more about the different foods available and their nutrient breakdown for a better and easier long term experience using the app.

###### screenshots:
![image](https://user-images.githubusercontent.com/61254766/121781491-b3210b00-cbad-11eb-8d4d-fce7718cf450.png)



### Custom Food
Also through the foods page the user can create a Custom Food if the available foods dont cover their needs.

###### screenshots:
![image](https://user-images.githubusercontent.com/61254766/121781497-bd430980-cbad-11eb-8a71-8f42a3a99da0.png)


### Settings
Through the settings page the user can configure the app using their own personal daily nutrient targets.

###### screenshots:
![image](https://user-images.githubusercontent.com/61254766/121781511-c7fd9e80-cbad-11eb-8715-6c566ad6dd0c.png)


### Other features
The app is responsive and can be used with a veriety of display shapes and sizes

###### screenshots:
![image](https://user-images.githubusercontent.com/61254766/121781524-e1064f80-cbad-11eb-8b49-496c117d8848.png)
![image](https://user-images.githubusercontent.com/61254766/121781539-efed0200-cbad-11eb-8350-bfd22d22e42a.png)



## Technologies Used
### Front end
* The front end side uses Reactjs with Redux for state management and semantic ui css for general styling.
* The redux devtools extension by zalmoxius is intergrated https://github.com/zalmoxisus/redux-devtools-extension 

### Back end
* The Back end consists of an Expressjs api connected to a mongoDb store using the mongoose interface.
* The **USDA Food Data Central api** is also used (see section [**Where does Caloree get its food related data?**](#where-does-caloree-get-its-food-related-data) )

### auth
* The only authentication method currently deployed is a standard google oauth2 flow.


#### Contributing
Pull requests are very welcome :)

## License
[MIT](https://choosealicense.com/licenses/mit/)
