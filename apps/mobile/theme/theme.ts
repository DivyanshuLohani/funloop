import { StyleSheet, TextStyle } from "react-native";

export const Colors = {
  background: "#0B0F19",
  card: "#1D2335",
  cardMuted: "#2C3249",
  textPrimary: "#FFFFFF",
  textSecondary: "#AAB4CF",
  textMuted: "#7B87A3",
  accentBlue: "#255DFF",
  accentGreen: "#2DCF2D",
  borderLight: "#3A4055",
  gold: "#FFD700",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Radius = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
  full: 999,
};

export const Typography = {
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  } satisfies TextStyle,
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  } satisfies TextStyle,
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
  } satisfies TextStyle,
  body: {
    fontSize: 14,
    color: Colors.textSecondary,
  } satisfies TextStyle,
  small: {
    fontSize: 14,
    color: Colors.textMuted,
  } satisfies TextStyle,
};

export const FunloopStyles = StyleSheet.create({
  // SCREEN BASE
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  // TOP NAV BAR
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  // PROFILE CARD
  profileCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: Radius.full,
    marginRight: Spacing.md,
  },

  // CHAT CARD
  chatCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  chatHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },

  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  chatAvatar: {
    width: 45,
    height: 45,
    borderRadius: Radius.full,
  },

  chatMessageBlock: {
    marginLeft: Spacing.sm,
    flex: 1,
  },

  // GAME SECTION
  gameTitle: {
    ...Typography.title,
    marginBottom: Spacing.md,
  },

  gameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },

  gameTileContainer: {
    width: "47%",
  },

  gameTile: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.card,
  },

  gameTileImage: {
    width: "100%",
    height: 120,
    borderRadius: Radius.md,
  },

  gameTileLabel: {
    color: Colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
    marginTop: Spacing.sm,
  },

  // BUTTONS
  primaryButton: {
    backgroundColor: Colors.accentBlue,
    paddingVertical: Spacing.md,
    borderRadius: Radius.xl,
    marginBottom: Spacing.md,
    alignItems: "center",
  },

  primaryButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },

  secondaryButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  secondaryButton: {
    backgroundColor: Colors.accentGreen,
    width: "48%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.xl,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  chatCard: {
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
  },

  gameTile: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },

  primaryButton: {
    backgroundColor: Colors.accentBlue,
    paddingVertical: Spacing.md,
    borderRadius: Radius.xl,
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  secondaryButton: {
    backgroundColor: Colors.accentGreen,
    paddingVertical: Spacing.md,
    borderRadius: Radius.xl,
    alignItems: "center",
    width: "48%",
  },
});
