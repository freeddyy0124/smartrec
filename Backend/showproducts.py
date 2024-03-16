import pandas as pd

csv_file = 'products_asos.csv'
df = pd.read_csv(csv_file)
 # print first 10 rows as json
print(df.head(10).to_json(orient='records'))

