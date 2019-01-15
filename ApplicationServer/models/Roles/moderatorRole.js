const moderatorRole = {
    name : 'moderator',
    permissions : {
        vote : {
            create : true,
            close : true,
            remove : false,
            cast : true,
            changeEndDate : true
        }
        , organisation : {
            create : true,
            addMember : true,
            removeMember : true,
            close : false
        }
        , member : {
            changeRole: false   
        }
    }
}

module.exports = moderatorRole;