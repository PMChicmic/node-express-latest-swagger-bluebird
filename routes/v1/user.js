
'use strict';

const Joi = require('joi');
const { LOGIN_TYPE, SERVER } = require('../../utils/constants');
const { convertKeysValueToArray } = require('../../utils/utils');
const { user } = require('../../utils/responseMsg');
const { authorization, convertErrorIntoReadableForm } = require('../../utils/utils');
const { registerUser, signIn, forgotPassword, changePassword_OTP } = require('../../controllers').v1.userController;

const signInType = convertKeysValueToArray(LOGIN_TYPE);

let Routes = [];
Routes = [
	{
		method: 'POST',
		path: '/v1/register',
		joiSchemaForSwagger: {
			body: {
                name: Joi.string().optional().allow(``).description(`User unique name.`).label(`Name`),
                email: Joi.string().optional().allow(``).description(`User\'s email id.`).label(`Email`),
                password: Joi.string().optional().allow(``).description(`User password.`).label(`Password`),
				fbId: Joi.string().optional().allow(``).description(`User facebook Id.`).label(`Facebook Id`),
				deviceToken: Joi.string().optional().allow(``).description(`User Device Token.`).label(`Device Token`),
                signUpType: Joi.number().required().description(
					`Register with Email: 1, Register/Login with FB: 2, Register/Login as Guest: 3`
				).valid(signInType).default(signInType[SERVER.ARRAY_FIRST_INDEX]).label(`Login type`)
			},
			group: `User`,
			description: `Route to register an user to the system.`,
			model: `Register`,
            responseClass: user.registerUser
		},
        failAction: convertErrorIntoReadableForm,
		handler: registerUser,
	},
    {
		method: 'POST',
		path: '/v1/signin',
		joiSchemaForSwagger: {
			body: {
				email: Joi.string().required().description('User id.').label('Email'),
				password: Joi.string().required().description('User id.').label('Password'),
				deviceToken: Joi.string().optional().description('User device token').label('Device Token')
			},
			group: 'User',
			description: 'Route to signin an user from system.',
			model: 'User SignIn',
			responseClass: user.signIn
		},
		auth: false,
        failAction: convertErrorIntoReadableForm,
		handler: signIn
    },
    {
        method: 'POST',
        path: '/v1/forget_password',
        joiSchemaForSwagger: {
            body: {
                email: Joi.string().required().description('User id.').label('Email')
            },
            group: 'User',
            description: 'Route to forgot password for user.',
            model: 'User Forgot Password',
            responseClass: user.forget_password
        },
        auth: false,
        failAction: convertErrorIntoReadableForm,
        handler: forgotPassword
    },
    {
        method: 'PUT',
        path: '/v1/reset_password',
        joiSchemaForSwagger: {
            body: {
                email: Joi.string().required().description('User id.').label('Email'),
                otp: Joi.string().required().description('User id.').label('Email'),
                password: Joi.string().required().description('User id.').label('Email'),
            },
            group: 'User',
            description: 'Route to reset password with otp.',
            model: 'User Reset Password',
            responseClass: user.reset_password
        },
        auth: false,
        failAction: convertErrorIntoReadableForm,
        handler: changePassword_OTP
    },
    // {
		// method: 'DELETE',
		// path: '/v1/user/:userId',
		// joiSchemaForSwagger: {
		// 	params: {
		// 		userId: Joi.string().required().description('User id.').example('5bfd2d692dc87f6b67445421'),
		// 	},
		// 	group: 'User',
		// 	description: 'Route to remove an user from the system.',
		// 	model: 'User_Fetch',
		// },
		// auth: 'USER',
    //     failAction: convertErrorIntoReadableForm,
		// handler: removeUser
    // },
    // {
    //     method: 'PUT',
    //     path: '/v1/user/:userId',
    //     joiSchemaForSwagger: {
    //         params: {
    //             userId: Joi.string().description('User id.'),
    //         },
    //         body: {
    //             userData: {
    //                 email: Joi.string().required().description('User\'s email id.'),
    //                 password: Joi.string().required().description('User\'s password.'),
    //                 pin: Joi.number().required().description("Pin number."),
    //                 facility: Joi.string().required().description('Facility id.'),
    //                 // role: Joi.number().allow(getEnumArray('USER_ROLES')).valid(1, 2).required().description("Role for user i.e 1 for Company-admin, 2 for Super-visor.")
    //             }
    //         },
    //         group: 'User',
    //         description: 'Route to update an user to the system.',
    //         model: 'User_Updation'
    //     },
    //     auth: 'USER',
    //     failAction: convertErrorIntoReadableForm,
    //     handler: updateUser
    // }
];
module.exports = Routes;

