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
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.36ffba19-7c54-466e-a272-d1bd976bdc41"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var SOCCER_FACTS = [
    "Soccer originated in London's famed Newgate Prison in the early eighteen hundreds, where prisoners who had their hands cut off for stealing came up with a sport that only involved their feet.",
    "There are thirty two panels on a traditional soccer ball, one for each country in Europe.",
    "While known as soccer ball in the States, and football elsewhere, the game's original name was basket ball because the first goals were overturned wicker baskets.",
    "A soccer field is called a pitch, because every regulation field is pitched or sloped five degrees upward from one end to the other.  The teams switch sides each half so both teams have to play uphill for half the match.",
    "The first American professional soccer league, the U S S A, played from nineteen nineteen to nineteen twenty-one. Its players were paid thirty five cents for every goal scored.",
    "The original World Cup was made of paper mache, but had to be replaced after the heavy rains of the nineteen fifty World Cup.",
    "Soccer balls are slightly oval shaped, but the checkered board pattern creates the illusion of a perfect sphere",
    "During her teenage years, Queen Elizabeth the second, while dressed in disguise, would frequently play in pickup soccer matches near Buckingham Palace.",
    "A professional soccer player runs about seven miles during an average soccer match.",
    "Until nineteen O eight, soccer balls were made from the inflated stomach tissue of executed Irish prisoners.",
    "In most countries, a soccer player's uniform is called a kit. The cleats are called hooves.",
    "From nineteen ninety-four to nineteen ninety-eight, the English Premier League, had red, yellow and teal cards. Teal cards were used for possible fouls that were to be reviewed by instant replay.",
    "Soccer is the national sport of Canada.",
    "Pele played one preseason game as a punter for the New Orleans Saints in nineteen eighty-one. His only punt traveled fifty four yards.",
    "Soccer was illegal in Mississippi until nineteen ninety-one.",
    "After the whistle blew to start the game, soccer player Lee Todd swore while commenting on how loud the whistle was. He received the fastest red card in history. Two seconds.",
    "In two thousand thirteen, soccer player Christiano Ronaldo opened a museum dedicated to himself.",
    "The first soccer game televised was a friendly match between Arsenal's first and second team in nineteen thirty-seven.",
    "The Vatican has its own soccer team.",
    "When the World Cup was hosted in the United States in nineteen ninety-four, only thirty million U S dollars was spent on infrastructure improvements. For the two thousand fourteen World Cup Brazil spent eleven billion U S dollars.",
    "When Germany won the two thousand fourteen World Cup in Brazil, it was the first time as a united country. The three previous times, the soccer World Cup was won by West Germany.",
    "In nineteen sixty-seven the Nigerian civil war ground to a halt for two days because both sides wanted to watch soccer player Pele in an exhibition match.",
    "The North Korean World Cup soccer fans are hand-picked by the North Korean government. The fans are also made up of Chinese volunteers because North Koreans are not allowed to travel.",
    "In nineteen ninety-eight, during a soccer match in Congo, a lightning bolt struck the field and killed all eleven members of one team. The other team was unharmed.",
    "A soccer ball is approximately twenty-eight inches in circumference.",
    "More then eighty percent of the world's soccer balls are produced in Pakistan.",
    "The World Cup trophy weighs nearly thirteen pounds and is made of eighteen carat gold.",
    "India pulled out of the nineteen fifty World Cup because the players were not allowed to play bare feet.",
    "The United States has almost eighteen million official soccer players, more than any other country in the world.",
    "It was only in nineteen eighty-four that professional soccer players were allowed to take part in the Olympics.",
    "The United States' Major League Soccer made its debut in nineteen ninety-six, shortly after the wildly successful nineteen ninety-four World Cup was hosted by the United States.",
    "The University of North Carolina has won an incredible sixteen national championships in women's soccer since the first tournament was played in nineteen eighty-two."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SoccerFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SoccerFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SoccerFacts.prototype = Object.create(AlexaSkill.prototype);
SoccerFacts.prototype.constructor = SoccerFacts;

SoccerFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SoccerFacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

SoccerFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SoccerFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SoccerFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SoccerFacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

SoccerFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Soccer Facts to tell me a soccer fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    // Get a random soccer fact from the soccer facts list
    var factIndex = Math.floor(Math.random() * SOCCER_FACTS.length);
    var fact = SOCCER_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your soccer fact: " + fact;

    response.tellWithCard(speechOutput, "Soccer Facts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var soccerFact = new SoccerFacts();
    soccerFact.execute(event, context);
};

