
import { ReactComponent as TreeContinueIcon } from "../assets/rawSvg/sidebarNavIcons/treeContinue.svg";
import { ReactComponent as TreeEndIcon } from "../assets/rawSvg/sidebarNavIcons/treeEnd.svg";


export function getItem (label, key, icon, children, navigateTo) {
    return {
      key,
      icon,
      children,
      label,
      navigateTo,
    };
  }
  
  export function generateMenuItems(data) {
    return data
      .map((menu, index) =>
        menu.itemList.map((item, subIndex) =>
          getItem(
            item.itemName,
            `${index}-${subIndex}`,
            item.itemIcon,
            item.children?.map((child, childIndex) => {
              const isLastChild = childIndex === item.children.length - 1; 
              return getItem(
                child.itemName,
                `${index}-${subIndex}-${childIndex}`,
                isLastChild ? <TreeEndIcon /> : <TreeContinueIcon />, 
                null,
                child.navigateTo
              );
            }),
            item.navigateTo
          )
        )
      )
      .flat();
  }
  
  
  export function flattenMenuItems (menuItems) {
    let flatItems = [];
  
    menuItems.forEach(item => {
      flatItems.push(item);
      if (item.children) {
        flatItems = flatItems.concat(flattenMenuItems(item.children));
      }
    });
  
    return flatItems;
  };



