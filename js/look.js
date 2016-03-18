var SAMPLE_THUMBS = [ { url: '/images/1.jpeg' },
  { url: '/images/2.jpeg' },
  { url: '/images/3.jpeg' },
  { url: '/images/4.jpeg' },
  { url: '/images/5.jpeg' },
  { url: '/images/6.jpeg' },
  { url: '/images/7.jpeg' },
  { url: '/images/8.jpeg' },
  { url: '/images/9.jpeg' },
  { url: '/images/10.jpeg' },
  { url: '/images/11.jpeg' },
  { url: '/images/12.jpeg' },
  { url: '/images/13.jpeg' },
  { url: '/images/14.jpeg' },
  { url: '/images/15.jpeg' },
  { url: '/images/16.jpeg' },
  { url: '/images/17.jpeg' },
  { url: '/images/18.jpeg' },
  { url: '/images/19.jpeg' },
  { url: '/images/20.jpeg' },
  { url: '/images/21.jpeg' },
  { url: '/images/22.jpeg' },
  { url: '/images/23.jpeg' },
  { url: '/images/24.jpeg' },
  { url: '/images/25.jpeg' } 
];

var Page = React.createClass({
	render: function(){
		return (
			<div className="container-fluid">
				<CoverContainer />
				<Gallery />
			</div>
		)
	}
});

var CoverContainer = React.createClass({
  loadCoverDataFromServer: function(){
		$.ajax({
			url: 'https://randomuser.me/api/',
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log(data.results[0].user)
				this.setState({
					userImageLarge: data.results[0].user.picture.large,
					userImageMed: data.results[0].user.picture.medium,
					userFirstName: data.results[0].user.name.first,
					userLastName: data.results[0].user.name.last,
					userCity: data.results[0].user.location.city,
					userState: data.results[0].user.location.state
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
  },
  componentDidMount: function() {
    this.loadCoverDataFromServer();
  },
  getInitialState: function() {
    return {
					userImageLarge: "",
					userImageMed: "",
					userFirstName: "",
					userLastName: "",
					userCity: "",
					userState: ""
    };
  },
	render: function() {
    return (
    	<div id="cover-container">
				<div style={{backgroundImage: 'url(' + this.state.userImageLarge + ')'}}  className="row" id="cover-bg">
				</div>
				<div id="cover-follow-button">Follow <i className="fa fa-heart-o"></i></div>
				<div id="cover-user-info">
					<div><img className="img-circle" src={this.state.userImageMed} /></div>
					<div className="user-meta-info">
						<div className="user-name">{this.state.userFirstName} {this.state.userLastName}</div><br />
						<div className="user-last-location">10m ago in {this.state.userCity}, {this.state.userState}</div>
					</div>
				</div>
			</div>
    );
  }
});



var Gallery = React.createClass({
	loadThumbnailsFromServer: function() {
		this.setState({thumbnails: SAMPLE_THUMBS})
		// $.ajax({
		// 	url: this.props.url,
		// 	dataType: 'json',
		// 	cache: false,
		// 	success: function(data) {
		// 		this.setState({thumbnails: data});
		// 	}.bind(this),
		// 	error: function(xhr, status, err) {
		// 		console.error(this.props.url, status, err.toString());
		// 	}.bind(this)
		// });
	},
	getInitialState: function() {
    return {thumbnails: []};
  },
  componentDidMount: function() {
    this.loadThumbnailsFromServer();
    // setInterval(this.loadThumbnailsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
    	
	  		<div className="row">
	  			<ThumbnailRoll data={this.state.thumbnails} /> 
	  		</div>
	  	
    );
  }
});


var ThumbnailRoll = React.createClass({
  render: function() {
    var thumbnailNodes = this.props.data.map(function(thumbnail) {
      return (
  			<div className="gallery col-md-15 col-sm-4 col-xs-6">
	  			<a href=''>
	  				<img src={thumbnail.url}/>
	  			</a> 
  			</div>
      );
    });
    
    return (
      <div>
        {thumbnailNodes}
      </div>
    );
  }
});


// var Thumbnail = React.createClass({
// 	render: function(){
// 		return (
// 			<div className="gallery col-md-15 col-sm-3 col-xs-6">
// 				<img src='/images/1.jpeg'/>
// 			</div>
// 		);
// 	}
// });


ReactDOM.render(
  <Page />, 
  document.getElementById('react-container') 
);
