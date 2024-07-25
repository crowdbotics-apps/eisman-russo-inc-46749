export function getItem (label, key, icon, children, navigateTo) {
    return {
      key,
      icon,
      children,
      label,
      navigateTo,
    };
  }
  
  export function generateMenuItems (data) {
    return data
      .map((menu, index) =>
        menu.itemList.map((item, subIndex) =>
          getItem(
            item.itemName,
            `${index}-${subIndex}`,
            item.itemIcon,
            item.children?.map((child, childIndex) =>
              getItem(
                child.itemName,
                `${index}-${subIndex}-${childIndex}`,
                null,
                null,
                child.navigateTo
              )
            ),
            item.navigateTo
          )
        )
      )
      .flat();
  };
  
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



