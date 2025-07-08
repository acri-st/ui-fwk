*** Settings ***
Suite Setup     Setup


*** Keywords ***
Setup
    Set Global Variable    ${HOST}    %{BASE_URL=http://localhost}
    Set Global Variable    ${UI_FWK_HOST}    %{UI_FWK_HOST=http://localhost:8200}
    Set Global Variable    ${DOMAIN}    %{DOMAIN=localhost}
    Set Global Variable    ${BASE_API}    %{BASE_API=/api/}
    Set Global Variable    ${SERVICE_PORT}  %{SERVICE_PORT=8080}
    Set Global Variable    ${USERNAME}    test2
    Set Global Variable    ${PASSWORD}    test2
