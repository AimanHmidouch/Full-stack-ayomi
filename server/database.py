import mysql.connector
import names

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="0000",
  database="ayomi"
)

mycursor = mydb.cursor()
i=0
while(i<100):
    first_name = names.get_first_name()
    last_name = names.get_last_name()
    email = first_name + "." + last_name + "@yopmail.com"
    phone_number = "+33643014673"
    sql = "INSERT INTO contact (first_name, last_name, email, phone_number) VALUES (%s, %s, %s, %s)"
    val = (first_name, last_name, email, phone_number)
    mycursor.execute(sql, val)
    i+=1

mydb.commit()