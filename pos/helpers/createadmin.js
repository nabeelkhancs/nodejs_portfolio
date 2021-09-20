const User = require('../models/User');
const permissions = require('./access_levels');
const Permission = require('../models/Permission');
const Location = require('../models/Location');

module.exports = async () => {
  let allPermissions = permissions.map(x => x.code);
  // console.log(allPermissions);
  const newRole = new Permission({
    name: 'Admin',
    description: 'Admin',
    permissions: allPermissions
  });
  await newRole.save();
  
  const newLocation = new Location({
    name: 'Default',
    address: "Default",
    locationType: "physical"
  });

  await newLocation.save();

  const newAdmin = new User({
    fullName: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    roleId: newRole.id,
    locationId: newLocation.id,
    isAdmin: true
  });
  
  await newAdmin.save();
  return;
};
