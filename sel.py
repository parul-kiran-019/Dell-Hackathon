from Selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.wait import WebDriverWait

# path = "C:/Users/91836/Downloads/chromedriver_win32/chromedriver.exe"
# driver = webdriver.Chrome(path)
# driver = webdriver.Chrome(executable_path='C:/Users/91836/Downloads/chromedriver_win32/chromedriver.exe')
driver = webdriver.Chrome("C:/Users/michael/Downloads/chromedriver_win32/chromedriver.exe")

driver.get("C:/Users/91836/Desktop/dell_hackathon")
html = driver.page_source
time.sleep(2)
print(html)

def cleandata(html):
    #data=f.read()
    ndata=html.split('\n')
    #print(ndata)
    fdata=""
    for i in ndata:
        if i.strip().startswith("<input") or i.strip().startswith("<select"):
            fdata=fdata+"  "+i+" \n "
            print("fdata ",fdata)

    return fdata

if __name__ == "__main__":
    cleandata(html)