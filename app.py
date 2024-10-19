from flask import Flask,render_template, session, request, jsonify

from boggle import Boggle





app = Flask(__name__)
app.secret_key = "supersecretkey"  # necessary to use session
boggle_game = Boggle()





@app.route('/')
def home_page():
    board = boggle_game.make_board()
    session['board'] = board  # Store the board in session
    return render_template('board.html', bd=board)





@app.route('/check-word', methods=["POST"])
def check_word():
    """Check if the guessed word is valid."""

    # Get the word from the request
    word = request.json["guess"]

    # Get the board from session
    board = session.get("board")

    result = boggle_game.check_valid_word(board, word)
    return jsonify({"result": result})



   

import pdb

@app.route('/update-stats', methods=["POST"])
def update_stats():
    # Adding the pdb breakpoint here to debug
    pdb.set_trace()

    # Get the score from the JSON sent by the front-end
    data = request.json
    score = data.get('score')

    # Get current statistics (you might store them in the session or database)
    num_games = session.get('num_games', 0)
    high_score = session.get('high_score', 0)

    # Update the number of games played
    session['num_games'] = num_games + 1

    # Update the high score if the new score is greater
    if score > high_score:
        session['high_score'] = score

    # Respond with the updated stats
    return jsonify({"num_games": session['num_games'], "high_score": session['high_score']})


