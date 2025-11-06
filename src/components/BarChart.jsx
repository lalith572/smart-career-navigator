import { Card, CardContent, Typography } from "@mui/material";

export default function StatsCard({ title, value, subtitle }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold" sx={{ my: 1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
