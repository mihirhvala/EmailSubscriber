from flask import Flask, request, jsonify ,Response
from flask_cors import CORS
import db_utility as db

app = Flask(__name__)
CORS(app)


# home method to empty api call
@app.route("/", methods = ['POST','GET'])
def home():
    out_data = "Looks like you are on wrong URL"
    return jsonify(out_data)


# api method to add new email to subscription
@app.route("/addSub", methods = ['POST'])
def add_subscription():
    input_data = request.get_json()
    connection = db.get_connection()
    if 'email' in input_data:
        email = input_data['email']
        try:
            # select_query = """SELECT count(*) from from email_subs where upper(email) = '{}'""".format(email.upper())
            # cur = db.select(connection,select_query)
            # print("CURRR")
            # print(cur)
            # row = cur[0]
            # if int(row[0])> 0:
            #     return jsonify({
            #         "status":"error",
            #         "message":"Email already subscribed"
            #     })

            query = """
                INSERT INTO "main"."email_subs" ("email", "created_date") VALUES ('{}', date('now'));
            """.format(email)

            
            err = db.insert_update_delete(connection,query)
            if err:
                return jsonify({
                    "status":"error",
                    "message":err
                })
            inserted = connection.total_changes
            if inserted > 0:
                return jsonify({
                    "status":"success",
                    "message":"Email added to subscription successfully"
                })
            else:
                return jsonify({
                    "status":"error",
                    "message":"Error while subscribing"
                })
        except Exception as e:
            return Response(str(e),status=400, mimetype='application/json')
        finally:
            db.close_connection(connection)
    else:
        return Response('Invalid/missing request parameter',status=400, mimetype='application/json')


# get method to fetch all email in JSON
@app.route("/getSubscriptions", methods = ['GET'])
def get_subscriptions():
    connection = db.get_connection()
    try:
        query = """
           SELECT email,created_date "createdDate" from email_subs
        """
        curr = db.select(connection,query)
        result = []
        for row in curr:
            result.append({"email":row[0],"subscriptionDate":row[1]})
        
        return jsonify(result)
    except Exception as e:
            return Response(str(e),status=400, mimetype='application/json')
    finally:
            db.close_connection(connection)


# Setting port number and host i.e., localhost by default
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8520)
