import xs from 'xstream'

function intent(domSources) {
  return domSources.select('.name')
    .events('input')
    .map(ev => ev.target.value);
};

function model(input$) {
  const state$ = input$.startWith("");
  return state$;
};

function view(state$) {
  return state$.map(val => (
    <div>
      <label for='name'>Name: </label>
      <input 
        className='name' 
        type='text' 
        value={val}
        placeholder="Enter a log name"
      />
      <button>Save</button>
    </div>
  ));
};

export function App (sources) {
  const input$ = intent(sources.DOM);
  const state$ = model(input$);
  const vtree$ = view(state$);
  
  const sinks = {
    DOM: vtree$
  }
  return sinks;
}
