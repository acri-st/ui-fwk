*** Settings ***
Library         String
Resource        ../utils/browser.robot

Suite Setup     Open Application    ${UI_FWK_HOST}

Test Tags       e2e basic

*** Test Cases ***
Basic Test
    # Take Screenshot
    Delete All Cookies
    ${result}=  Get Text    css=h1
    Should Be Equal     ${result}   Welcome to the UI Framework


