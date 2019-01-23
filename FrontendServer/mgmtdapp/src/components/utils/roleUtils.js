const roleUtils = {
    getRoleForUserInOrganisation: function getRoleForUserInOrganisation(user, memberList, rolesList) {
        if ((!!memberList && (memberList.length > 0)) && !!user) {
            let userMembership = memberList.filter((member) => { return user.id == member.id })[0];
            if (!!userMembership && rolesList.length > 0) {
                let userRole = rolesList.filter((role) => {
                    return role.name == userMembership.role
                })[0];
                return userRole;
            }
        }
    }
}

export default roleUtils;