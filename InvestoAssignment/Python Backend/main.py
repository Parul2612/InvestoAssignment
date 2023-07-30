import pandas as pd
import mysql.connector as mysql
from mysql.connector import Error

stocks_data = pd.read_csv(r'C:\Users\Admin\Downloads\Untitled Folder\HINDALCO_1D.csv', index_col=False, delimiter = ',')

try:
    conn = mysql.connect(host='localhost', database='stocks', user='root', password='root@123')
    if conn.is_connected():
        cursor = conn.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)
        #loop through the data frame
        for i,row in stocks_data.iterrows():
            #here %S means string values 
            sql =  "INSERT INTO stocks_data(datetime ,close ,high ,low ,open ,volume ,instrument) VALUES (%s,%s,%s,%s,%s,%s,%s)"
            cursor.execute(sql, tuple(row))
            print("Record inserted")
            # the connection is not auto committed by default, so we must commit to save our changes
            conn.commit()
except Error as e:
            print("Error while connecting to MySQL", e)