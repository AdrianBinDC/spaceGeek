/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * FIXME: App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var WHITE_HOUSE_FACTS = [
    // The following facts come from http://www.factmonster.com/ipka/A0877632.html
    "The White House has 132 rooms.",
    "The White House has 35 bathrooms.",
    "The White House has 6 levels."
    "The White House has 412 doors.",
    "The White House has 147 windows.",
    "The White House has 28 fireplaces.",
    "The White House has 8 staircases.",
    "The White House has 3 elevators.",
    "Pierre L'Enfant designed the city of Washington, D.C.",
    "Pierre L'Enfant, the planner for Washington, D.C., placed the Capitol for one hill and the President's house on another.",
    "The White House was originally known variously as The President's Palace, the Presidential Mansion, or the President's House",
    "The earliest evidence of the public referring to the White House as the White House is in 1811",
    "President Theodore Roosevelt established the official name of the residence as The White House in 1901",
    "The White House was set ablaze by British soldiers in 1814 in retaliation for U.S. soldiers burning Upper Canada's Parliament Buildings in the Battle of York.",
    "The design of the White House was picked from a competition.",
    "The winner of the competition to design the President's house was awarded $500.",
    "Thomas Jefferson, subsequently the third President, is said to have submitted a design anonymously for the White House.",
    "James Hoban was the winner of the context to design the White House",
    "James Hoban, the architect who designed the White House, was an Irish immigrant.",
    "James Hoban, the architect who designed the White House, also supervised completion of the Capitol's North Wing from 1798 to 1800."
    "James Hoban, the architect who designed the White House, also designed the facade of the old state Capitol building in Columbia, South Carolina.",
    "The design of the White House was generally influenced by the Leinster House in Dublin, the native country of the White House's designer, James Hoban.",
    "James Hoban, the architect who designed the White House, was also one of the superintendants in charge of erecting the U.S. Capitol building.",
    "James Hoban, the architect who designed the White House, emigrated to the United States in 1785.",
    "James Hoban, the architect who designed the White House, was introduced to George Washington when he was living in Charleston, South Carolina",
    "The original architect of the White House, James Hoban, oversaw the White House's reconstruction for ten years after British burned it in 1814.",
    "Work on the White House began in 1792.",
    "Stonemasons for the White House's construction were hired from Scotland.",
    "George Washington oversaw construction of the White House, but never lived there.",
    "Bricks for the original White House were made on the north lawn.",
    "Sandstone for the White House's construction is from Stafford County, Virginia.",
    "John Adams, the Second President of the United States, was the first President to live in the White House.",
    "The first President to live in the White House was the second President of the United States.",
    "Only six of the White House's 132 rooms were complete when John Adams, the first President to live in the White House, moved in."
    "On August 24, 1814, the British sailed up the Potomac River and set the White House on fire."
    "On August 24, 1814, the White House was set on fire by the British during The War of 1812.",
    "A summer thunderstorm put out the fire set alight at the White House by the British during The War of 1812.",
    "The White House has 6 floors: two basements, two public floors, and two floors for the First Family.",
    "Prior to being called the White House, the residence was known as the President's Palace, the President's House, and the Executive Mansion.",
    "To paint the exterior walls of the White House, 570 gallons of paint are required.",
    "Theodore Roosevelt installed the first tennis court at the White House."
    "President George H.W. Bush enlarged the present tennis court in 1989.",
    "In 2009, President Barack Obama had basketball court lines painted and removable baskets added to the tennis court.",
    "A quarter-mile jogging track was installed at the White House in 1993 by President Bill Clinton.",
    "A quarter-mile jogging track was installed for President Clinton because his running jogging habit was disruptive to traffic near the White House.",
    "In 1975, a swimming pool and a cabana were installed at the White House by President Gerald Ford.",
    "The First Family can enter the White House pool cabana through an underground passage from the West Wing.",
    "President George W. Bush installed solar panels on the White House pool cabana in 2002.",
    "The White House grounds are designated as a National Park, making the National Park Service responsible grounds maintenance.",
    // Movie theater facts
    "The White House family theater was converted from a cloak room in 1942 under President Franklin Delano Roosevelt.",
    "The White House family theater has approximately 40 upolstered seats set behind four big armchairs installed by President Dwight D. Eisenhower.",
    "The White House family theater received a makeover in 2004 in red.",
    "Prior to 2004, the White House family theater was dominated by white curtains with red floral patterns.",
    // which president installed a billiard room?
    // TODO: This one requires more research.

    // Bowling Alley facts
    "Bowling lanes were originally installed at the White House under President Truman as a birthday gift to him from friends.",
    "The original White House bowling alley was originally in the present-day Situation Room.",
    "The present-day White House bowling alley was built in 1969 under President Nixon.",
    "The present-day White House bowling alley is in an underground workspace area underneath the driveway to the North Portico.",

    // What is a mimeograph (replaced the original bowling alley)
    // Easter Egg Roll facts
    "The first White House Easter Egg Roll took place in 1878 after Congress banned egg rolling on Capitol Hill.",
    "In 1878, President Rutheford B. Hayes allowed children to roll Easter eggs on the White House grounds, starting the tradition of the White House Easter Egg Roll."
    
    // TODO: facts about rooms of the White House
    // TODO: Tee Ball game http://www.whitehousemuseum.org/grounds/south-lawn.htm
    // TODO: East Wing Construction
    // TODO: West Wint Construction

];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SpaceGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SpaceGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SpaceGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * WHITE_HOUSE_FACTS.length);
    var fact = WHITE_HOUSE_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your White House fact: " + fact;

    response.tellWithCard(speechOutput, "SpaceGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};

