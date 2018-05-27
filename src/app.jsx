import xs from 'xstream'

function  intent(sources) {
  return sources;
};

function model(actions) {
  return actions;
};

function view(state) {
  return xs.of(
    <div>
      <label for='name'>Name: </label>
      <input className='name' type='text'/>
      <button>Save</button>
    </div>
  );
};

export function App (sources) {
  const actions = intent(sources);
  const state = model(actions);
  const vtree$ = view(state);
  const sinks = {
    DOM: vtree$
  }
  return sinks;
}
