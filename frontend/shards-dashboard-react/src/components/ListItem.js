import React from "react";
import Typography from "@material-ui/core/Typography";

function ListItem(props) {
  const { href, item } = props;
  return (
    <div>
      <li>
        <a target="_blank" href={item.url}>
          <Typography>{item}</Typography>
        </a>
      </li>
    </div>
  );
}

export default ListItem;
