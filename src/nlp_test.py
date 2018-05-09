# Need to delete sqlite when updating
# Need different sqlite for each model
# Need to train a general sqlite that all can use. Things like hello, goodbye, thankz
# Mongodb is how we will update, still functionality to read and parse csv file.



# I need way to map similar question together to boost confidence.
# So if in the training Data we have a question like 
#   "Where are your locations"
# I need to turn that into. 
#   "Where are your stores", "Where can I find you", "What are the nearest locations", "Do you have locations in XYX?"
#   I need this to be able to raise the confidence Level, otherwise I will have to keep the Confidence Scores Very Low
# Doing this won't be easy, but i think that it is very possible. I think i may need to do some mapping ahead of time for classification
# Like group questions by type, "Location", "Hours", "Products", "Customer Service"

print ("Hello")

import sys
import json
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import os

########################################################################################
                                    # Turn Off stdout 
########################################################################################


########################################################################################
                                    # Bot Configurations
########################################################################################

chatbot = ChatBot(
            "Ron Obvious",   
            logic_adapters=[
                {
                    'import_path': 'chatterbot.logic.BestMatch'
                },
                {
                    'import_path': 'chatterbot.logic.LowConfidenceAdapter',
                    'threshold': 0.55,
                    'default_response': 'I am sorry, but I do not understand.'
                }
            ]
)


########################################################################################
                                    # Train Bot
########################################################################################

print ("Training Bot")

# Now we just need training data from all different kinds of fields
conversation = [
    "How can i check my balance",
    "Click the account button in the top right corner",
    "Where are my friends",
    "On the home page",
    "Whats your name",
    "GUH"
]

chatbot.set_trainer(ListTrainer)
chatbot.train(conversation)


chatbot.trainer.export_for_training('./my_export.json')



########################################################################################
                                    # Send Response to Server
########################################################################################

response = chatbot.get_response('what do you call yourself?')
print(response)
print ("Running")