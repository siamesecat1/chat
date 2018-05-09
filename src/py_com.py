# Need to delete sqlite when updating
# Need different sqlite for each model
# Need to train a general sqlite that all can use. Things like hello, goodbye, thankz
# Mongodb is how we will update, still functionality to read and parse csv file.


import sys
import json
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import os

########################################################################################
                                    # Turn Off stdout 
########################################################################################

f = open(os.devnull, 'w')
original = sys.stdout 
sys.stdout = f


########################################################################################
                                    # Bot Configurations
########################################################################################

chatbot = ChatBot(
        "Ron Obvious",   
        logic_adapters=[
            'chatterbot.logic.MathematicalEvaluation',
            "chatterbot.logic.BestMatch"
        ],
)


########################################################################################
                                    # Train Bot
########################################################################################

# Now we just need training data from all different kinds of fields
# conversation = [
#     "Hi im a bot"## BOT
#     "Hey there", 
#     'Hello! How Are you?', ## BOT
#     'Im good how about you?', 
#     "Im doing fine what can i help you with?", ## BOT
#     "I need help returning an item",
#     "Oh, why do you need to make this return?" ## BOT
# ]


walmartConvo = [
    "Hello",
    "How can I contact Walmart about a store experience or product question?",
    "Please visit our Contact Us page(https://corporate.walmart.com/contact-us/store-corporate-feedback) or call 1-800-WALMART.",
    "How can I locate a Walmart store/store hours?",
    "Please visit walmart.com and use the store finder tool https://www.walmart.com/store/finder",
    "Can I park my RV at a Walmart store?",
    "While we do not offer electrical service or accommodations typically necessary for RV customers, Walmart values RV travelers and considers them among our best customers. Consequently, we do permit RV parking on our store parking lots as we are able. Permission to park is extended by individual store managers, based on availability of parking space and local laws. Please contact management in each store to ensure accommodations before parking your RV.",
    "Can I bring a service animal inside a Walmart store?",
    "Walmart is committed to making reasonable modifications to its policies, practices, and procedures to permit the use of service animals by its customers with disabilities. Service animals play an important role in ensuring the independence of people with disabilities, and it is our policy to welcome into our stores any animal that is individually trained to assist a person with a disability.",
    "Where can I find shipping information for products purchased on Walmart.com?",
    "You can get free two-day shipping on millions of select items online on orders of $35 or more - no membership needed. With our Pickup Discount, you can order online and pick up in store for even lower prices on select items. Learn more about shipping and returns at walmart.com.",
    "Where can I find information about product recalls?",
    "Please visit our Product Recall page for product safety and recall information. You may also call or visit your local store for more product safety and recall information.",
    "What is EPC?",
    "Electronic product code (EPC) is the next generation of bar codes. An EPC label contains specific information about a product, such as its identity, the manufacturer, as well as a unique serial number that distinguishes one item from another. Walmart and Sam’s Club use EPC to better manage our inventory and make sure the products you want – in the size, color and style you want – are available when you need them.",
    "Where can I use my Walmart Gift Card?",
    "Physical (tangible) cards with a PIN (personal identification number) may be used in any United States or Puerto Rico Walmart store or Sam’s Club, including parts of the facility that are managed by Walmart. These gift cards can also be used on walmart.com and on samsclub.com (members only). Online-only gift cards (e-cards) can only be used online at walmart.com or samsclub.com (membership required). An e-card is an electronic shopping account comprised of solely an account number and a balance; it does not include a tangible gift card.",
    "Where can a Walmart gift card NOT be used? (Can they be used in the eating establishments? e.g., McDonald's?)",
    "Does the picture on the card restrict what it can be used for?",
    "No, the picture on the card is for entertainment purposes only and has no reference to possible uses of the account funds.",
    "Can a gift card be used as a phone card?",
    "No",
    "How can my organization apply for a grant?",
    "To see if your organization qualifies for charitable giving from Walmart or the Walmart Foundation, please visit our Community Giving section to learn about our three types of giving programs – Local, State and National.",
    "Do Walmart or the Walmart Foundation provide funding to individuals?",
    "Our giving guidelines do not allow support directly for individuals. The best way to seek help for your individual situation is to contact one of the organizations Walmart supports, such as The United Way (800) 892-2757 The Salvation Army (800) SAL-ARMY The American Red Cross (800) HELP-NOW",
    "Are scholarship programs available?",
    "How can I contact Walmart's corporate headquarters?",
    "Please visit our Contact Us page for information on how to contact the corporate headquarters, or other departments at Walmart.",
    "How can I become a supplier to Walmart or Sam's Club?",
    "Please review available supplier programs for information on becoming a Walmart or Sam's Club supplier.",
    "How can someone lease space within a Walmart store?",
    "For information on leasing space within a Walmart store, please contact our Vestibule Leasing Department. They can be reached at 479-273-4516."
]




chatbot.set_trainer(ListTrainer)
chatbot.train(walmartConvo)


########################################################################################
                                    # Send Response to Server
########################################################################################

# Put stdout back to normal
sys.stdout = original

response = chatbot.get_response(sys.argv[1])
print( json.dumps({'data':str(response)} ) )



# import fileinput
# for line in fileinput.input():
#     print (line)
# import sys
