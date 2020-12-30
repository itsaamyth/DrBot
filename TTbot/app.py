from telegram import Update
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
from telegram import Bot, Update, ReplyKeyboardMarkup
import textt


def start(update: Update, context: CallbackContext) -> None:
    author = update.message.from_user.first_name
    reply = "Hi! {}".format(author)
    update.message.reply_text(reply+textt.welcome_text)
def startt(update,context):
    user_input = update.message.text
    if user_input in textt.greet:
        author = update.message.from_user.first_name
        reply = "Hi! {}".format(author)
        update.message.reply_text(reply+textt.welcome_text)


def help(update,context) -> None:
    update.message.reply_text(textt.help_text)

def donate(update,context):
    update.message.reply_text(textt.donate_text)
    

def disease(update,context):
    update.message.reply_text("Choose a category",reply_markup=ReplyKeyboardMarkup(keyboard=textt.topics_keyboard, one_time_keyboard=True)) 

def reply(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(textt.no_text_found)

#disease

def Colds_and_Flu(update,context):
    update.message.reply_text(textt.Colds_and_Flu)
def Conjunctivitis(update,context): 
    update.message.reply_text(textt.Conjunctivitis)
def Diarrhea(update,context):
    update.message.reply_text(textt.Diarrhea)
def Headaches(update,context):
    update.message.reply_text(textt.Headaches)
def Diabetes(update,context):
    update.message.reply_text(textt.Diabetes)
def Malaria(update,context):
    update.message.reply_text(textt.Malaria)
def Dengue(update,context):
    update.message.reply_text(textt.Dengue)
def COVID_19(update,context):
    update.message.reply_text(textt.COVID_19)
def Asthma(update,context):
    update.message.reply_text(textt.Asthma)
def main():
    updater = Updater("Token Dedo BHai apna", use_context=True)
    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler("start", start))
    dispatcher.add_handler(CommandHandler("help", help))
    dispatcher.add_handler(CommandHandler("disease", disease))
    dispatcher.add_handler(CommandHandler("donate",donate))
    dispatcher.add_handler(CommandHandler("Colds_and_Flu",Colds_and_Flu))
    dispatcher.add_handler(CommandHandler("Conjunctivitis",Conjunctivitis))
    dispatcher.add_handler(CommandHandler("Diarrhea",Diarrhea))
    dispatcher.add_handler(CommandHandler("Headaches",Headaches))
    dispatcher.add_handler(CommandHandler("Diabetes",Diabetes))
    dispatcher.add_handler(CommandHandler("COVID_19",COVID_19))
    dispatcher.add_handler(CommandHandler("Malaria",Malaria))
    dispatcher.add_handler(CommandHandler("Dengue",Dengue))
    dispatcher.add_handler(CommandHandler("Asthma",Asthma))
    dispatcher.add_handler(MessageHandler(Filters.text, startt))
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, reply))
    updater.start_polling()
    updater.idle()


if __name__ == '__main__':
    main()
