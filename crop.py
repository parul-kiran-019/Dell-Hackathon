from selenium import webdriver
from selenium.webdriver.common.by import By
from PIL import Image
  
# create webdriver object
Path = "C:\Program Files (x86)\chromedriver.exe"
driver = webdriver.Chrome(Path)
# get geeksforgeeks.org
driver.get("file:///C:/Users/91836/Desktop/dell_hackathon/index.html")
  
# get element 
element = driver.find_element(By.ID,"btn2")
  
# click screenshot 
element.screenshot('foo.png')

ss = Image.open('foo.png')
ss.show()