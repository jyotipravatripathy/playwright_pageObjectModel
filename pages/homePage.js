exports.HomePage = class HomePage{
constructor(page){
  this.page = page
  this.newTodo_textBox = page.getByTestId("text-input")
  this.toggle_checkbox = page.getByRole('listitem').filter({ hasText: 'test3' }).getByTestId('todo-item-toggle')
}

// load the url
async gotoHomePage(){
  await this.page.goto('https://todomvc.com/examples/react/dist/')
}

// enter the text
async enterText(text) {
await this.newTodo_textBox.fill(text)
await this.newTodo_textBox.press('Enter')
}
// select the checkbox
async selectCheckBox(){
  await this.toggle_checkbox.check()
}
}