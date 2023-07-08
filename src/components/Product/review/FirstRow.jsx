import { Box } from "@mui/system";

export function FirstRow({ authorName, updated_at }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            alignItems: 'center',
            alignItems:'center'
        }}>
            <Box component='h2' sx={{
                fontFamily: 'Nunito',
                fontStyle: 'normal',
                fontWeight: 800,
                fontSize: '20px',
                lineHeight: '29px',
                color: '#1A1A1A'
            }}>
                {authorName}
            </Box>

            <Box sx={{
                fontFamily: 'Nunito',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#7B8E98'
            }}>
                {(updated_at).substr(0,10)}
            </Box>
        </Box>
    )
}