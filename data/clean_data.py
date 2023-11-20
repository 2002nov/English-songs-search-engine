import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Download NLTK stop words if not already downloaded
nltk.download('stopwords')

# Define the path to your input CSV file and output cleaned CSV file
input_csv_file = 'Data_final.csv'  # Replace with the path to your CSV file
output_csv_file = 'cleaned_data_final.csv'  # Replace with your desired file path for the cleaned data

# Step 1: Read the CSV file into a DataFrame
#df = pd.read_csv(input_csv_file)
df = pd.read_csv(input_csv_file, encoding='ISO-8859-1')

# Step 2: Handle Missing Values (Optional)
# You can choose how to handle missing values; here, we'll drop rows with any missing data.
#df.dropna(inplace=True)

# Step 3: Standardize Data (Optional)
# Standardize text data to lowercase
# df['song name'] = df['song name'].str.lower()
df['artist'] = df['artist'].str.lower()
df['genre'] = df['genre'].str.lower()
df['lyrics'] = df['lyrics'].str.lower()

# Step 4: Remove Special Characters and space between words
# You can use regular expressions to remove special characters
# df['song name'] = df['song name'].apply(lambda x: re.sub(r'[^\w\s]', '', x))
df['artist'] = df['artist'].apply(lambda x: re.sub(r'[^\w\s]', '', x))
df['genre'] = df['genre'].apply(lambda x: re.sub(r'[^\w\s]', '', x))
df['lyrics'] = df['lyrics'].apply(lambda x: re.sub(r'[^\w\s]', '', x))

# Step 5: Tokenization (Optional)
# If you want to tokenize text into words, you can use the following:
# df['song name'] = df['song name'].apply(lambda x: x.split())
# df['artist'] = df['artist'].apply(lambda x: x.split())
# df['genre'] = df['genre'].apply(lambda x: x.split())
df['lyrics'] = df['lyrics'].apply(lambda x: x.split())

# Step 6: Stemming (Optional)
# Apply stemming to reduce words to their root form (e.g., "jumping" -> "jump")
stemmer = PorterStemmer()
#df['lyrics'] = df['lyrics'].apply(lambda x: ' '.join([stemmer.stem(word) for word in x.split()]))
df['lyrics'] = df['lyrics'].apply(lambda words: ' '.join([stemmer.stem(word) for word in words]))

# Step 7: Remove Stop Words (Optional)
# Remove common stop words from the text data
stop_words = set(stopwords.words('english'))
df['lyrics'] = df['lyrics'].apply(lambda x: ' '.join([word for word in x.split() if word not in stop_words]))

# Step 8 remove space between words
# df['song name'] = df['song name'].apply(lambda x: re.sub(r'[^\w\s]', '', x).replace(' ', ''))
df['artist'] = df['artist'].apply(lambda x: re.sub(r'[^\w\s]', '', x).replace(' ', ''))
df['genre'] = df['genre'].apply(lambda x: re.sub(r'[^\w\s]', '', x).replace(' ', ''))
df['lyrics'] = df['lyrics'].apply(lambda x: re.sub(r'[^\w\s]', '', x).replace(' ', ''))

# Step 11: Save the cleaned data to a new CSV file
df.to_csv(output_csv_file, index=False)

print(f"Cleaned data saved to {output_csv_file}")
