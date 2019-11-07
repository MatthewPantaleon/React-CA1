## How to run the Application

Download the repository to desired folder.

```
cd /to download directory
```

Then run ``` npm install ```

Make sure to have a browser extension that will enable *Cross-Origin-Resource-Sharing*, otherwise the application won't work.

Then run either: ``` npm start ``` or ``` npm run start ```

You can access the live application via [here](https://age-of-empires-2-comparator.web.app/). You would also need a *CORS* extension for this as well.

#### Report footnotes:
- The original idea was to only be able to compare units and originally not civilizations too. That's why the parent component of UnitComponent is called CompareComponent and why its URL is */compare*.
- For some of the unit images I had to take a small existing image and up scale it to be more UI friendly.
- The images of the Paladin is actually a Cavalier and the Hussar's is Light Cavalry.