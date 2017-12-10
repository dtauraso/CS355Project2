var express = require('express');
var router = express.Router();
//var address_dal = require('../model/address_dal');
var project2_dal = require('../model/projTwo_dal');

router.get('/listAllPrograms', (req, res) =>
  {
    //console.log("got here")
    project2_dal.getPrograms()
    .then(result =>
      {
        let programs = result
        res.render('projTwo/listAllPrograms', {programs})
      }
    )
    //res.render('projTwo/listAllPrograms')
  }
)
router.get('/addLanguage', (req, res) =>
{
    //
    // go to addLanguge page
}
);

router.get('/addNewLanguage', () =>
{
    //
    // redirect back to the listAllPrograms page
}
)

router.get('/addStyle', () =>
{
    //
    // go to addStyle page
}
)
router.get('/addNewStyle', () =>
{
    //
    // redirect back to the listAllPrograms page
}
)

router.get('/addProgram', () =>
{
    // enter program
    // show the entry form for entering programs
}
)

router.get('/saveProgram', () =>
{
    // save program name into database
    // save users with the program into database
    // render the page listAllPrograms
}
)


router.get('/addUser', (req, res) =>
{
    console.log("need to add a new user", req.query)
    let program_id = req.query.program_id
    // get all known languages
    project2_dal.getAllLanguages()
    .then(result =>
      {
        let language = result
        console.log(language)
        // render enterDataForUser page
        res.render("projTwo/enterDataForUser", {language, program_id});
      }
    )


}
)

router.get('/addNewUser', (req, res) =>
{

    console.log("here", req.query)
    //exit()
    let program_id = req.query.program_id
    let person_name = req.query.name
    let contribution_in_lines_of_code = req.query.contributions
    let user = {person_name, contribution_in_lines_of_code}
    // insert into person
    project2_dal.insert(user, 'person')
    .then(result =>
      {
          let person_id = result.insertId
          let user_id = result.insertId

          let language_id = req.query.language_id
          let style_id = 0
          let language_person_object = {language_id, person_id, style_id}
          project2_dal.insert(language_person_object, 'language_person')
          .then(result =>
            {
              console.log("done")
              project2_dal.getStyles1()
              .then(styles =>
                {
                  project2_dal.getLanguagesUserPicked(language_id)
                  .then(languages =>
                    {
                      res.render('projTwo/pickStyleForEachLanguage', {languages, styles, user_id, program_id});
                    }
                  )
                }
              )
            }
          )

    }
    )

    //res.render('projTwo/pickStyleForEachLanguage', {languages, styles, user_id});

    // save the user data into tables
    // save name and contribution_in_lines_of_code to person table


}
)



router.get('/pickStylePerLanguage', (req, res) =>
{

    console.log(req.query)

    console.log("done")
    project2_dal.getStyles(req.query.style_id, req.query.language_id, req.query.program_id, req.query.person_id)
    .then(result =>
      {
        console.log("done changing things")
        project2_dal.getPrograms()
        .then(result =>
          {
            let programs = result
            // go to another page and confirm the add
            // send a success status for the div on the copy of the same ejs file
            let person_id = req.query.person_id
            project2_dal.getUserName(person_id)
            .then(person =>
              {
                console.log(person)
                let sucess = true
                let person_name = person[0].person_name
                console.log("sucess", sucess)
                res.render('projTwo/listAllProgramsAndConfirmationMessage', {programs, person_name, sucess})
                //res.render('projTwo/listAllPrograms', {programs})
              }
            )


          }
        )
        // render the all programs page now
      }
    )

    // render the listAllPrograms page with the confirmation message
}
)

router.get('/', (req, res) =>
{
    console.log("got here")
    // get the styles and languages used in the program
    // get the users data
    // make a multidimentional array to hold all of the data collected
    // for each user for program
      // get all of the languga_person entries for the user(person_id, language_id)
    // for each language id
      // get the style ids from the language id

    // send the multidimentional array to the '/' page
}
)
router.get('/sqlCallsP1AndP2', () =>
{
    // run the procedure holding all of the calls
    // send the result to sqlCallsForP1AndP2
}
)

/*
for / page
program name
  languages:

  styles:

  users:
    user1
      name
      contributions
      language1, style1
      languagen, stylen
*/

module.exports = router;
