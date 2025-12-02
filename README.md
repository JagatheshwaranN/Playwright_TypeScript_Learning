To install Playwright
npm init playwrigth@latest

To run all playwright tests
npx playwright test 

To run specific playwright test
npx playwright test <test_script_name>

To run specific set of playwright tests
npx playwright test <test_script1_name> <test_script2_name>


To run playwright test in headed mode
npx playwright test --headed

To execute test in specific browser
npx playwright test <test_script_name> --project=chromium

To see the html report
npx playwright show-report

To execute all tests matches the name of test
npx playwright test -g "Verify"

To execute test from UI mode
npx playwright test --ui

To execute test in debug mode
npx playwright test <test_script_name> --debug

