/**
 * Created by Yana on 12.09.2016.
 */
var array = [];
var max = 5;
array = fs.readdir(images);
for (var i=0; i<max; i++){
    //array[i]="images/image"+i+".webp";
    console.log(array[i]);
}


var Result = React.createClass({

    render: function(){
        var resultTemplate = array.map(function(item, i){
            return (
                <div className="picture" key ={i} >
                    <img width="24.9%" height="300px" src={item}/>
            </div>
            );
        })
        return(
            <div>
            {resultTemplate}
            </div>
        );
    }
});

ReactDOM.render(<Result/>, document.getElementById('app'));

