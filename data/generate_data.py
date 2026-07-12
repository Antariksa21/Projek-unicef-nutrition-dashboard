import csv
import os
import random

# Set random seed for reproducibility
random.seed(42)

# Define categories
indicators = ['Stunting', 'Breastfeeding (Exclusive)', 'Wasting', 'Overweight']
genders = ['Male', 'Female', 'Total']
ages = ['0-5 months', '6-23 months', 'Under 5 years']
poverty_ratings = ['Poorest', 'Poorer', 'Middle', 'Richer', 'Richest']
residences = ['Urban', 'Rural']
educations = ['No Education', 'Primary', 'Secondary', 'Higher']
years = [2018, 2019, 2020, 2021, 2022, 2023, 2024]

headers = [
    'Country', 'Indicator', 'Gender', 'Age', 
    'Poverty_Rating', 'Residence', 'Maternal_Education', 
    'Year', 'Observation_Value'
]

# Ensure directory exists
os.makedirs('D:/Gemini test/data', exist_ok=True)

csv_path = 'D:/Gemini test/data/NUTRITION_CLEAN.csv'

with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    
    # Generate rows with logical social-economic trends
    for year in years:
        # General trend of improvement over time
        year_factor = (year - 2018) / 6.0  # 0.0 to 1.0
        
        for indicator in indicators:
            for gender in genders:
                for age in ages:
                    for poverty in poverty_ratings:
                        for residence in residences:
                            for edu in educations:
                                # Base value for indicators
                                if indicator == 'Stunting':
                                    base = 30.8 - (year_factor * 6.5)  # Stunting drops from ~30.8% to ~24.3% over time
                                    
                                    # Influence of poverty (richer = less stunting)
                                    poverty_idx = poverty_ratings.index(poverty)
                                    base -= poverty_idx * 2.8  # Richest has ~11.2% lower stunting than Poorest
                                    
                                    # Influence of residence (urban = less stunting)
                                    if residence == 'Urban':
                                        base -= 3.5
                                        
                                    # Influence of education (higher education = less stunting)
                                    edu_idx = educations.index(edu)
                                    base -= edu_idx * 3.2  # Higher ed has ~9.6% lower stunting than No Education
                                    
                                    # Influence of gender
                                    if gender == 'Male':
                                        base += 0.8
                                    elif gender == 'Female':
                                        base -= 0.8
                                        
                                elif indicator == 'Breastfeeding (Exclusive)':
                                    base = 42.0 + (year_factor * 8.0)  # Breastfeeding rises from ~42% to ~50%
                                    
                                    # Poverty rating influence
                                    poverty_idx = poverty_ratings.index(poverty)
                                    base += poverty_idx * 1.2
                                    
                                    # Residence influence
                                    if residence == 'Rural':
                                        base += 4.0  # Rural areas often have higher breastfeeding rates
                                        
                                    # Education influence
                                    edu_idx = educations.index(edu)
                                    base += edu_idx * 1.5
                                    
                                    # Gender influence
                                    if gender == 'Female':
                                        base += 0.5
                                        
                                elif indicator == 'Wasting':
                                    base = 10.2 - (year_factor * 1.8)  # Wasting drops from ~10.2% to ~8.4%
                                    
                                    # Poverty
                                    poverty_idx = poverty_ratings.index(poverty)
                                    base -= poverty_idx * 0.8
                                    
                                    # Residence
                                    if residence == 'Urban':
                                        base -= 1.0
                                        
                                    # Education
                                    edu_idx = educations.index(edu)
                                    base -= edu_idx * 0.6
                                    
                                else:  # Overweight
                                    base = 6.5 + (year_factor * 1.2)  # Overweight rises slightly from ~6.5% to ~7.7%
                                    
                                    # Poverty
                                    poverty_idx = poverty_ratings.index(poverty)
                                    base += poverty_idx * 1.5
                                    
                                    # Residence
                                    if residence == 'Urban':
                                        base += 1.8
                                        
                                    # Education
                                    edu_idx = educations.index(edu)
                                    base += edu_idx * 0.5
                                
                                # Add some random noise (-1.5% to +1.5%)
                                noise = random.uniform(-1.5, 1.5)
                                obs_value = max(0.1, round(base + noise, 2))
                                
                                writer.writerow([
                                    'Indonesia', indicator, gender, age, 
                                    poverty, residence, edu, year, obs_value
                                ])

print(f"Dataset mock berhasil dibuat dengan sukses di: {csv_path}!")
