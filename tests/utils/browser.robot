*** Settings ***
Library     Browser
# Resource    auth.robot


*** Keywords ***
Open Application
    [Arguments]    ${url}
    Log To Console    opening url ${url}
    New Browser    chromium    headless=True
    New Context    viewport={'width': 1920, 'height': 1080}    ignoreHTTPSErrors=${True}
    New Page    ${url}
    Wait For Elements State    css=#loading-page    hidden

CheckField
    [Arguments]    ${element}    ${attribute}    ${expected}
    ${is_visibility_checked}    Get Property    ${element}    ${attribute}
    Should Be Equal    '${is_visibility_checked}'    ${expected}


Check Element Has Class
    [Arguments]    ${element}    ${class}
    ${element_class} =    Browser.Get Attribute    ${element}    class
    Should Contain  ${element_class}        ${class}

    
Check Element Does Not Have Class
    [Arguments]    ${element}    ${class}
    ${element_class} =    Browser.Get Attribute    ${element}    class
    Should Not Contain  ${element_class}        ${class}

