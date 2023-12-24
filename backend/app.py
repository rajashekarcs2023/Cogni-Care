from flask import Flask, request
import json
import openai
import os

api = Flask(__name__)

openai.api_type = "azure"
openai.api_key = 'APIKEY2'
openai.api_base = 'https://api.umgpt.umich.edu/azure-openai-api/ptu'
openai.api_version = '2023-03-15-preview'


@api.route('/questions')
def questions():
    with open("qas.json", "r") as file:
        return json.load(file)


@api.route('/accuracy')
def accuracy():
    given = request.args.get('given')
    real = request.args.get('real')
    return gpt_accuracy(given, real)


def gpt_accuracy(answer1, answer2):
    response = openai.ChatCompletion.create(
        engine='gpt-4',
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Determine the accuracy of the given answer to the real answer. Accuracy should be on a scale of 1 to 10 with 10 being almost same. Allow for slight variation. Award more points for the correct sentence topic. Only return the number. Given answer:{answer1} True answer: {answer2}"}
        ]
    )
    return response['choices'][0]['message']['content']


@api.route('/search')
def search():
    query = request.args.get('query')

    ref = {}

    # works on mac; change path for windows
    userpath = os.path.expanduser('~/Documents/Programming/mhacks/backend')

    for folder1 in os.listdir(userpath+"/summary/"):
        for file in os.listdir(userpath+"/summary/" + folder1):
            ref[userpath+"/video_chunks/" + folder1 + '_chunks/' +
                file.split(".")[0] + '.mp4'] = open(userpath+"/summary/" + folder1 + '/' + file, "r", encoding="utf8", errors="ignore").read()

    response = openai.ChatCompletion.create(
        engine='gpt-4',
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user",
                "content": f"In which file is the answer to the following question contained (return the file paths in an array of strings, in JSON): File and content dictionary {ref}. Question: {query}"}
        ]
    )
    return response['choices'][0]['message']['content']
