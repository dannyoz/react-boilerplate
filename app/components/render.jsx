React.render(
    <div id="main">
      	<Header />
      	<CardHolder api="https://api.behance.net/v2/users/danosborne854b/projects?client_id=wvNTJgcr74RaKq61IVckPzUGzT5LYt5h" />
  		<Loadmore />
  	</div>,
    document.getElementById('app')
);