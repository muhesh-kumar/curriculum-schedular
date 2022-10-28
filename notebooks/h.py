import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.read_csv(r"C:\Users\mitug\curriculum-schedular\notebooks\heatmap.csv")

df = df.set_index("Prerequisite")


sns.heatmap(df)
plt.show()