import React from "react";
import ListItem from "../components/ListItem";
import Typography from "@material-ui/core/Typography";

function SelectedDomainsComponent(props) {
  return (
    <React.Fragment>
      <hr style={{ backgroundColor: "white" }} />
      <Typography>
        {
          "We noticed that you like some websites better than the others. Well, we also do that XD. "
        }
      </Typography>
      <br />
      <Typography>
        {
          "Here is a curated list of websites(From your favourites) to make you understand the concept better."
        }
      </Typography>
      <ul>
        {props.selectedSuggestions.map((item, index) => (
          <ListItem
            key={props.selectedSuggestions[index]}
            href={props.selectedSuggestions[index]}
            item={props.selectedSuggestions[index]}
          />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default SelectedDomainsComponent;
