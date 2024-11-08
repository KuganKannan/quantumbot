from chatterbot
from chatterbot.trainers import ChatterBotCorpusTrainer
import tkinter as tk
from tkinter import scrolledtext

# Create the ChatterBot instance
chatbot = ChatBot('LocalBot')
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train('chatterbot.corpus.english')

# Function to get a response from ChatterBot
def ask_local_bot(prompt):
    response = chatbot.get_response(prompt)
    return str(response)

# Function to handle sending the message and updating the chat window
def send_message():
    user_input = user_entry.get()
    if user_input.strip() == "":
        return
    chat_window.config(state=tk.NORMAL)
    chat_window.insert(tk.END, "You: " + user_input + "\n")
    chat_window.config(state=tk.DISABLED)
    
    # Get bot response from ChatterBot
    bot_response = ask_local_bot(user_input)
    
    # Display bot's response
    chat_window.config(state=tk.NORMAL)
    chat_window.insert(tk.END, "Bot: " + bot_response + "\n")
    chat_window.config(state=tk.DISABLED)
    
    # Clear the input field
    user_entry.delete(0, tk.END)

# Set up the Tkinter window
window = tk.Tk()
window.title("ChatterBot Chatbot")

# Configure the chat window (Scrollable text box)
chat_window = scrolledtext.ScrolledText(window, wrap=tk.WORD, state=tk.DISABLED)
chat_window.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

# Create the user entry field and send button
user_entry = tk.Entry(window, width=50)
user_entry.pack(side=tk.LEFT, padx=10, pady=10, expand=True, fill=tk.X)

send_button = tk.Button(window, text="Send", command=send_message)
send_button.pack(side=tk.RIGHT, padx=10, pady=10)

# Start the Tkinter main loop
window.mainloop()
