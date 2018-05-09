from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer


###############################################################################
                            # Main
###############################################################################
chatbot = ChatBot(
        "Ron Obvious",   
        logic_adapters=[
            'chatterbot.logic.MathematicalEvaluation',
            "chatterbot.logic.BestMatch"
        ],
)


# Now we just need training data from all different kinds of fields
conversation = [
    "How can i check my balance",
    "Click the account button in the top right corner",
    "Where are my friends",
    "On the home page",
    "Whats your name",
    "GUH",


]

chatbot.set_trainer(ListTrainer)
chatbot.train(conversation)


response = chatbot.get_response("What do you call yourself")
print(response)
print(type()

