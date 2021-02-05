from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

#Init app
app = Flask(__name__)
CORS(app)

# Database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:0000@localhost/ayomi"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#Init db
db = SQLAlchemy(app)
#Init ma
ma = Marshmallow(app)
#Contact class/model
class Contact(db.Model):
    id = db.Column(db.Integer, unique = True, primary_key = True)
    first_name = db.Column(db.String(30), unique = True)
    last_name = db.Column(db.String(30), unique = True)
    email = db.Column(db.String(50), unique = True)
    phone_number = db.Column(db.String(20), unique = True)

    def __init__(self, first_name, last_name, email, phone_number):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number

#Contact schema
class ContactSchema(ma.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'email', 'phone_number')

#Init schema
contact_schema = ContactSchema()
contact_schema = ContactSchema(many = True)

#Define routes

#Get all contacts
@app.route('/api/contacts', methods =['GET'])
def get_contacts():
    all_contacts = Contact.query.all()
    result = contact_schema.dump(all_contacts)
    return jsonify(result)

#Get single contact 
@app.route('/api/contacts/<id>', methods =['GET'])
def get_contact(id):
    single_contact = Contact.query.get(id)
    if not single_contact:
        return jsonify({'message' : 'No contact found!'})
    
    contact_data = {}
    contact_data['first_name'] = single_contact.first_name
    contact_data['last_name'] = single_contact.last_name
    contact_data['email'] = single_contact.email
    contact_data['phone_number'] = single_contact.phone_number
    return jsonify({'contact' : contact_data  })

#Create contact
@app.route('/api/contact/create', methods =['POST'])
def add_contact():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    phone_number = request.json['phone_number']

    new_contact = Contact(first_name, last_name, email, phone_number)
    db.session.add(new_contact)
    db.session.commit()

    return jsonify({'message' : 'new contact created'})

#Create contact
@app.route('/store', methods =['GET'])
def store():
    first_name = "7869708"
    last_name = "7869708"
    email = "7869708"
    phone_number = "7869708"

    new_contact = Contact(first_name, last_name, email, phone_number)
    db.session.add(new_contact)
    db.session.commit()

    return "sucess"

#Update contact
@app.route('/api/contact/update/<id>', methods =['PUT'])
def update_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({'message' : 'No contact found!'})

    first_name = request.json['first_name']  #make them non required
    last_name = request.json['last_name']
    email = request.json['email']
    phone_number = request.json['phone_number']

    contact.first_name = first_name
    contact.last_name = last_name
    contact.email = email
    contact.phone_number = phone_number

    db.session.commit()
    print(contact)
    return "modidied"

#Delete contact
@app.route('/api/contact/delete/<id>', methods =['DELETE'])
def delete_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({'message' : 'No contact found!'})

    db.session.delete(contact)
    db.session.commit()

    return jsonify({'message' : 'contact deleted'})

#Delete All
@app.route('/api/contact/delete/all', methods =['DELETE'])
def deleteAll():
    try:
        num_rows_deleted = db.session.query(Contact).delete()
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify({'message' : 'All contacts deleted'})

#Run server
if __name__ == '__main__':
    app.run(debug = True)