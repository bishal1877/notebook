import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modaal from './Modaal';

function OutCard(props) {

    return (
      
    <Box  style={{ width:"max-content"  ,margin:"20px",boxShadow:"2px 2px 10px grey", borderRadius:"10px" ,textAlign:"center"}}> 
      <Card variant="outlined">
<React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div"  >
    {props.title.slice(0,20)}...
      </Typography>
      <Typography variant="body2" style={{marginTop:"10px"}}>
    {props.content.slice(0,30)}...
        <br />
      </Typography>
    </CardContent>
    <CardActions>
      <Modaal title={props.title} content={props.content}/>
    </CardActions>
  </React.Fragment>
      </Card>
    </Box>
  );
}
export default OutCard;
