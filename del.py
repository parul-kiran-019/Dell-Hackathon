from selenium import webdriver
from selenium.webdriver.common.by import By
import time

#set chromodriver.exe path
path = "C:\Program Files (x86)\chromedriver.exe"
driver = webdriver.Chrome(path)

#maximize browser
driver.maximize_window()
#launch URL
driver.get("https://www.tutorialspoint.com/")

element = driver.find_element(By.ID,'search-strings')
script = "var element = arguments[0]; element.parentNode.removeChild(element);"
driver.execute_script(script, element)

time.sleep(2)
driver.close()