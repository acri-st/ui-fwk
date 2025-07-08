*** Settings ***
Library         String
Resource        ../../utils/browser.robot

Suite Setup     Open Application    ${UI_FWK_HOST}

Test Tags       e2e components checklist

*** Test Cases ***
Check first item
    Delete All Cookies
    Click    css=#checklist .check-list-item >> nth=0
    
    Check Element Does Not Have Class    css=#checklist .check-list-item >> nth=1    checked

Check all items
    Delete All Cookies
    Click    css=#checklist .check-list-item >> nth=1
    Click    css=#checklist .check-list-item >> nth=2

    Check Element Has Class    css=#checklist .check-list-item >> nth=0    checked
    Check Element Has Class    css=#checklist .check-list-item >> nth=1    checked
    Check Element Has Class    css=#checklist .check-list-item >> nth=2    checked

    
Click on single item when all are checked should uncheck all but item
    Delete All Cookies
    Click    css=#checklist .check-list-item >> nth=1

    Check Element Does Not Have Class    css=#checklist .check-list-item >> nth=0    checked
    Check Element Has Class    css=#checklist .check-list-item >> nth=1    checked
    Check Element Does Not Have Class    css=#checklist .check-list-item >> nth=2    checked

