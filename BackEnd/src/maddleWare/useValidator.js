import { body, validationResult } from "express-validator";
const useValidator = 
     [
      body('name').notEmpty().withMessage('Name is required').notEmpty(),
      body('age').isInt({ min: 18, max: 45 }).withMessage('Age must be between 18 and 45').notEmpty(),
      body('tall').optional().isNumeric().withMessage('Tall must be a number'),
      body('land').notEmpty().withMessage('Land is required'),
      body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female']).withMessage('Invalid gender'),
      body('email').isEmail().withMessage('Invalid email').notEmpty(),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty(),
      body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
    ];
  



  const employeeValidationRules = 
     [
      body('salary').notEmpty().isNumeric().withMessage('Salary must be a number'),
      body('vacationDays').notEmpty().isInt().withMessage('Vacation days must be an integer'),
      body('workHours').notEmpty().isInt().withMessage('Work hours must be an integer'),
      body('contractLimit').notEmpty().isISO8601().withMessage('Contract limit must be a valid date in ISO 8601 format'),
      body('department').notEmpty().withMessage('Department is required').isString().withMessage('Department must be a string'),
      body('Userss').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid user ID')
    ];
 
    const logInValidator= [
      body("email").isEmail().withMessage("Invalid email format").isLength({ min: 5 }).withMessage("Email must be at least 5 characters long"),
      body("password").isLength({ min: 5 }).withMessage("Invalid password format")
    
    
    ]


/*The validate function you've defined is a middleware
 function that is used to check the result of
  validation performed by the express-validator library. Let's break down its purpose and usage:*/ 

const validate = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return  res.status(422).json({ errors: errors.array() });
    }
  next()

  };


  export {validate, useValidator, employeeValidationRules,logInValidator}