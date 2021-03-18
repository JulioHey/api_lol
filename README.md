### API for some Main Stream Games

  * This repositories contains classes that will help you to fetch data from Riot Api (League of Legends, future: Valorant), and SteamApi(CSGO), with Typescript;
    * Conversion of the Strings in Achievments.json from CSGO api, to the Strings that appear in game, and returns the achievments in order off difficulty for getting it;
    * In LOL Api, the json Files facilitates the conversion of the key value, from the API, to the String that will be for the champion, rune, or spell images;

  - I'm current working on a project that will use that api, so i didn't implemented reusability in all classes yet;
  - Todo:
    - [] Decodify strings in the method to find by User, in both RiotApi and SteamApi;
    - [] Get prepare the classes for all methods in RiotApi;
    - [] Prepare all classes for reusability;
    - [] Create Valorant methods;

  * For you to use the classes you will need to get your own ApiKeys, and give it a AxiosStatic class to it get the info you need;
