const adminRole = {
    name : 'admin',
    permissions : {
        vote : {
            create : true,
            close : true,
            remove : true,
            cast : true,
            changeEndDate : true
        }
        , organisation : {
            create : true,
            addMember : true,
            removeMember : true,
            close : true
        }
        , member : {
            changeRole: true   
        }
    }
}

module.exports = adminRole;