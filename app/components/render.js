React.render(
    React.createElement("div", {id: "main"}, 
      	React.createElement(Header, null), 
      	React.createElement(CardHolder, {api: "https://api.behance.net/v2/users/danosborne854b/projects?client_id=wvNTJgcr74RaKq61IVckPzUGzT5LYt5h"})
  	),
    document.getElementById('app')
);